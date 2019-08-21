using System;
using System.Threading.Tasks;
using MeuCondominioApi.Core;
using MeuCondominioApi.Services;
using MeuCondominioApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MeuCondominioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly IConfiguration _configuration;

        public AutenticacaoController(UsuarioService usuarioService, IConfiguration configuration)
        {
            _usuarioService = usuarioService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UsuarioViewModel entity)
        {
            var usuario = await _usuarioService.FindByEmailAsync(entity.Email);

            if (usuario != null)
            {
                if (await _usuarioService.CheckPasswordAsync(usuario, entity.Senha))
                {
                    var dataCriacao = DateTime.Now;
                    var dataExpiracao = dataCriacao.AddMonths(3);
                    string[] papeis = { "usuario" };

                    var encodedToken = new JwtConfiguration()
                        .GenerationToken(_configuration, usuario.Id, dataExpiracao, papeis);

                    return Ok(new
                    {
                        success = true,
                        content = new TokenViewModel
                        {
                            Token = encodedToken,
                            DataExpiracao = dataExpiracao
                        }
                    });
                }
            }

            return BadRequest(new { success = false, message = "Usuário e/ou senha inválidos" });
        }
    }
}
