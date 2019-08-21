using MediatR;
using MeuCondominioApi.Commands;
using MeuCondominioApi.Core;
using MeuCondominioApi.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeuCondominioApi.Handlers
{
    public class ApartamentoCommandHandler : 
        IRequestHandler<CreateApartamento, Response>, 
        IRequestHandler<UpdateApartamento, Response>,
        IRequestHandler<DeleteApartamento, Response>,
        IDisposable
    {
        private readonly ContextoDados _contextoDados;

        public ApartamentoCommandHandler(ContextoDados contextoDados)
        {
            _contextoDados = contextoDados;
        }

        public void Dispose()
        {
            _contextoDados.Dispose();
        }

        public async Task<Response> Handle(CreateApartamento request, CancellationToken cancellationToken)
        {
            var apartamento = new Apartamento
            {
                Numero = request.Numero
            };

            _contextoDados.Apartamentos.Add(apartamento);
            await _contextoDados.SaveChangesAsync();

            return new Response("Apartamento criado com sucesso.");
        }

        public async Task<Response> Handle(UpdateApartamento request, CancellationToken cancellationToken)
        {
            var apartamento = new Apartamento
            {
                Id = request.Id,
                Numero = request.Numero
            };

            _contextoDados.Apartamentos.Update(apartamento);
            await _contextoDados.SaveChangesAsync();

            return new Response("Apartamento atualizado com sucesso.");
        }

        public async Task<Response> Handle(DeleteApartamento request, CancellationToken cancellationToken)
        {
            var apartamento = _contextoDados.Apartamentos.Find(request.Id);

            if(apartamento != null)
            {
                _contextoDados.Apartamentos.Remove(apartamento);
                await _contextoDados.SaveChangesAsync();

                return new Response("Apartamento removido com sucesso.");
            }
            else
            {
                return new Response("Apartamento não encontrado.");
            }

            
        }
    }
}
