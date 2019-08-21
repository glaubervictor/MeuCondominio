using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class DeleteMorador : IRequest<Response>
    {
        public Guid Id { get; set; }
     

        public DeleteMorador(Guid id)
        {
            Id = id;
        }
    }
}
