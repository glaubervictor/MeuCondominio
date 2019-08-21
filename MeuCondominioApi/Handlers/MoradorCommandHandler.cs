using MediatR;
using MeuCondominioApi.Commands;
using MeuCondominioApi.Core;
using MeuCondominioApi.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MeuCondominioApi.Handlers
{
    public class MoradorCommandHandler :
        IRequestHandler<CreateMorador, Response>,
        IRequestHandler<UpdateMorador, Response>,
        IRequestHandler<DeleteMorador, Response>,
        IDisposable
    {
        private readonly ContextoDados _contextoDados;

        public MoradorCommandHandler(ContextoDados contextoDados)
        {
            _contextoDados = contextoDados;
        }

        public void Dispose()
        {
            _contextoDados.Dispose();
        }

        public async Task<Response> Handle(CreateMorador request, CancellationToken cancellationToken)
        {
            var morador = new Morador
            {
                ApartamentoId = request.ApartamentoId,
                Cpf = request.Cpf,
                DataNascimento = request.DataNascimento,
                Email = request.Email,
                NomeCompleto = request.NomeCompleto,
                Telefone = request.Telefone
            };

            _contextoDados.Moradores.Add(morador);
            await _contextoDados.SaveChangesAsync();

            return new Response("Morador criado com sucesso.");
        }

        public async Task<Response> Handle(UpdateMorador request, CancellationToken cancellationToken)
        {
            var morador = new Morador
            {
                Id = request.Id,
                ApartamentoId = request.ApartamentoId,
                Cpf = request.Cpf,
                DataNascimento = request.DataNascimento,
                Email = request.Email,
                NomeCompleto = request.NomeCompleto,
                Telefone = request.Telefone
            };

            _contextoDados.Moradores.Update(morador);
            await _contextoDados.SaveChangesAsync();

            return new Response("Morador atualizado com sucesso.");
        }

        public async Task<Response> Handle(DeleteMorador request, CancellationToken cancellationToken)
        {
            var apartamento = _contextoDados.Moradores.Find(request.Id);

            if (apartamento != null)
            {
                _contextoDados.Moradores.Remove(apartamento);
                await _contextoDados.SaveChangesAsync();

                return new Response("Morador removido com sucesso.");
            }
            else
            {
                return new Response("Morador não encontrado.");
            }

            
        }
    }
}
