﻿using MediatR;
using MeuCondominioApi.Commands;
using MeuCondominioApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet("{id}", Name = "Get_Morador")]
        public IActionResult Get(Guid id)
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

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteMorador command)
        {
            return Response(await _mediator.Send(command).ConfigureAwait(false));
        }
    }
}
