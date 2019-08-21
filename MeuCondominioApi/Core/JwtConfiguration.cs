using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace MeuCondominioApi.Core
{
    public class JwtConfiguration
    {
        public string GenerationToken(
            IConfiguration configuration,
            Guid? userId,
            DateTime expiration,
            string[] roles)
        {
            var issuer = configuration["Authentication:Issuer"];
            if (string.IsNullOrWhiteSpace(issuer))
            {
                throw new Exception("Missing Authentication:Issuer value");
            }

            var audience = configuration["Authentication:Audience"];
            if (string.IsNullOrWhiteSpace(audience))
            {
                throw new Exception("Missing Authentication:Audience value");
            }

            var secretKey = configuration["Authentication:SecretKey"];
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new Exception("Missing Authentication:SecretKey value");
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", userId.HasValue ? userId.Value.ToString() : string.Empty),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiration,
                SigningCredentials = creds,
                Issuer = issuer,
                Audience = audience
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
