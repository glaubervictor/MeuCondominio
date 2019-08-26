using MediatR;
using MeuCondominioApi.Core;
using System;

namespace MeuCondominioApi.Commands
{
    public class UpdateApartamento : IRequest<Response>
    {
        public int Id { get; }
        public int Numero { get; }

      
        public UpdateApartamento(int id, int numero)
        {
            Id = id;
            Numero = numero;
        }
    }
}
