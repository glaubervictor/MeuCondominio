using MeuCondominioApi.Models;
using MeuCondominioApi.Services;
using MeuCondominioApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeuCondominioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        
        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UsuarioViewModel entity)
        {
            var usuario = new Usuario
            {
                UserName = entity.Email,
                Email = entity.Email
            };

            var result = await _usuarioService.CreateAsync(usuario, entity.Senha);

            if (result.Succeeded)
            {
                return Ok(new { success = true, message = "Usuário criado com sucesso." });
            }
            else
            {
                return BadRequest(new { success = false, message = "Usuário não criado." });
            }
        }
    }
}