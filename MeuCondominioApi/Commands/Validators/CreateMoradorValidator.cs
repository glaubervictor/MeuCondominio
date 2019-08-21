using FluentValidation;

namespace MeuCondominioApi.Commands.Validators
{
    public class CreateMoradorValidator : AbstractValidator<CreateMorador>
    {
        public CreateMoradorValidator()
        {
            RuleFor(c => c.ApartamentoId)
                .NotEmpty().WithMessage("O campo apartamento é obrigatório.");

            RuleFor(c => c.NomeCompleto)
                .NotEmpty().WithMessage("O campo nome é obrigatório.");

            RuleFor(c => c.DataNascimento)
                .NotEmpty().WithMessage("O campo data de nascimento é obrigatório.");

            RuleFor(c => c.Cpf)
                .NotEmpty().WithMessage("O campo CPF é obrigatório.");

            RuleFor(c => c.Email)
                .EmailAddress().WithMessage("O campo e-mail inválido.")
                .NotEmpty().WithMessage("O campo e-mail é obrigatório.");
        }
    }
}
