using FluentValidation;

namespace MeuCondominioApi.Commands.Validators
{
    public class UpdateApartamentoValidator : AbstractValidator<UpdateApartamento>
    {
        public UpdateApartamentoValidator()
        {
            RuleFor(c => c.Id)
                .NotEmpty().WithMessage("O campo Id é obrigatório.");

            RuleFor(c => c.Numero)
                .NotEmpty().WithMessage("O campo número é obrigatório.");
        }
    }
}
