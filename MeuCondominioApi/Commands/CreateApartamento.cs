using MediatR;
using MeuCondominioApi.Core;

namespace MeuCondominioApi.Commands
{
    public class CreateApartamento : IRequest<Response>
    {
        public int Numero { get; }

        public CreateApartamento(int numero)
        {
            Numero = numero;
        }
    }
}
