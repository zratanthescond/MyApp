import { z } from 'zod';

export const BordereauSchema = z.object({
    MontantTotal: z.number({ required_error: 'Total amount is required' }).min(1000, { message: '* Total amount should be more than 1000' }),
    DateBordereau: z
        .instanceof(Date, { message: 'The Date field is required.' })
        .refine((date) => {
            //console.log(new Date(date).toDateString('en-US') === new Date(Date.now()).toDateString('en-US'))

            return new Date(date).toDateString('en-US') >= new Date(Date.now()).toDateString('en-US');
        }, "* The date must be after today"),

    NombreDocuments: z.number({ required_error: 'number doc is required' }).min(1, { message: '* Number doc should be more than 0' }),
    AnneeBordereau: z.number({ required_error: 'year is required' }).min(new Date().getFullYear()),
});