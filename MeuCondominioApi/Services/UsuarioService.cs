using MeuCondominioApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;

namespace MeuCondominioApi.Services
{
    public class UsuarioService : UserManager<Usuario>
    {
        public UsuarioService(
            IUserStore<Usuario> store, 
            IOptions<IdentityOptions> optionsAccessor, 
            IPasswordHasher<Usuario> passwordHasher, 
            IEnumerable<IUserValidator<Usuario>> userValidators, 
            IEnumerable<IPasswordValidator<Usuario>> passwordValidators, 
            ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, 
            IServiceProvider services, 
            ILogger<UserManager<Usuario>> logger) 
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }
    }
}
