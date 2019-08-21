using FluentValidation;

namespace MeuCondominioApi.Commands.Validators
{
    public class CreateApartamentoValidator : AbstractValidator<CreateApartamento>
    {
        public CreateApartamentoValidator()
        {
            RuleFor(c => c.Numero)
                .NotEmpty().WithMessage("O campo número é obrigatório.");
        }
    }
}
