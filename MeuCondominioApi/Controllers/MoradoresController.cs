using MediatR;
using MeuCondominioApi.Commands;
using MeuCondominioApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MeuCondominioApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class MoradoresController : ApiController
    {
        private IMoradorService _moradorService;
        private readonly IMediator _mediator;

        public MoradoresController(
            IMoradorService moradorService,
            IMediator mediator)
        {
            _moradorService = moradorService;
            _mediator = mediator;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Response(_moradorService.GetAll());
        }

        [HttpGet("search")]
        public IActionResult Get([FromQuery] string description)
        {
            return Response(_moradorService.GetByDescription(description));
        }

        [HttpGet("{id}", Name = "Get_Morador")]
        public IActionResult Get(int id)
        {
            return Response(_moradorService.GetById(id));
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateMorador command)
        {
            return Response(await _mediator.Send(command).ConfigureAwait(false));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateMorador command)
        {
            return Response(await _mediator.Send(command).ConfigureAwait(false));
        }

        [HttpDelete("{id}", Name = "Delete_Morador")]
        public async Task<IActionResult> Delete(int id)
        {
            return Response(await _mediator.Send(new DeleteMorador(id)).ConfigureAwait(false));
        }
    }
}
