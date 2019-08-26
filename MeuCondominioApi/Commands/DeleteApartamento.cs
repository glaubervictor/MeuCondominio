using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class DeleteApartamento : IRequest<Response>
    {
        public int Id { get; }

        public DeleteApartamento(int id)
        {
            Id = id;
        }
    }
}
