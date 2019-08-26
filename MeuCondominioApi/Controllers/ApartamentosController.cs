using System;
using System.Threading.Tasks;
using MediatR;
using MeuCondominioApi.Commands;
using MeuCondominioApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeuCondominioApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class ApartamentosController : ApiController
    {
        private IApartamentoService _apartamentoService;
        private readonly IMediator _mediator;

        public ApartamentosController(
            IApartamentoService apartamentoService,
            IMediator mediator)
        {
            _apartamentoService = apartamentoService;
            _mediator = mediator;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Response(_apartamentoService.GetAll());
        }

        [HttpGet("{id}", Name = "Get_Apartamento")]
        public IActionResult Get(int id)
        {
            return Response(_apartamentoService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateApartamento command)
        {
            return Response(await _mediator.Send(command).ConfigureAwait(false));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateApartamento command)
        {
            return Response(await _mediator.Send(command).ConfigureAwait(false));
        }

        [HttpDelete("{id}", Name = "Delete_Apartamento")]
        public async Task<IActionResult> Delete(int id)
        {
            return Response(await _mediator.Send(new DeleteApartamento(id)).ConfigureAwait(false));
        }
    }
}
