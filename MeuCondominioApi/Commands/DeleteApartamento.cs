using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class DeleteApartamento : IRequest<Response>
    {
        public Guid Id { get; }

        public DeleteApartamento(Guid id)
        {
            Id = id;
        }
    }
}
