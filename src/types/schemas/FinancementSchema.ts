import { z } from 'zod';

export const FinancementSchema = z.object({
    MontantFinancement: z.number({ required_error: 'Montant de financement est requis' })
        .min(1, { message: '* Montant de financement doit être supérieur ou égal à 0' }),

    DateDeFinancement: z
        .instanceof(Date, { message: 'La date de financement est requise.' })
        .refine((date) => {
            //console.log(new Date(date).toDateString('en-US') === new Date(Date.now()).toDateString('en-US'))

            return new Date(date).toDateString('en-US') >= new Date(Date.now()).toDateString('en-US');
        }, "* The date must be after today"),
});
