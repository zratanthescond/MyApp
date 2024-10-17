import { z } from 'zod';

export const BordereauDetailsSchema = z.object({
    MontantDocument: z.number({ required_error: 'Document amount is required' })
        .min(1000, { message: '* Document amount should be more than 1000' }),

    DateFacture: z
        .instanceof(Date, { message: 'The Date field is required.' })
        .refine((date) => new Date(date) > new Date(Date.now()), "* The date must be after today"),
    Echeance: z.number({ required_error: 'Echeance doc is required' }).min(1, { message: '* Echeance doc should be more than 0' }),

    RefFacture: z.string({ required_error: 'Ref facture is required' })
        .min(5, { message: '* Ref facture must be at least 5 characters long' }), // min length of 5 characters


});
