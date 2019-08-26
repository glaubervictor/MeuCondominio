using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class DeleteMorador : IRequest<Response>
    {
        public int Id { get; set; }
     

        public DeleteMorador(int id)
        {
            Id = id;
        }
    }
}
