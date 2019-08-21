using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class UpdateApartamento : IRequest<Response>
    {
        public Guid Id { get; }
        public int Numero { get; }

      
        public UpdateApartamento(Guid id, int numero)
        {
            Id = id;
            Numero = numero;
        }
    }
}
