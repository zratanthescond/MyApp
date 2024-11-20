import { z } from 'zod';
import { TFunction } from "i18next";

export const CreateBordereauDetailsSchema = (t: TFunction) =>
    z.object({
        MontantDocument: z.number({ required_error: t("handlingError:document_amount_required") }),



        DateFacture: z
            .instanceof(Date, { message: t("handlingError:date_required") })
            .refine(
                (date) =>
                    new Date(date).toLocaleDateString("en-US") <=
                    new Date(Date.now()).toLocaleDateString("en-US"),
                { message: t("handlingError:date_after_today") }
            ),

        Echeance: z.number({ required_error: t("handlingError:echeance_required") }),

        RefFacture: z.string({ required_error: t("handlingError:ref_facture_required") })
            .min(5, { message: t("handlingError:ref_facture_min_5_chars") }), // min length of 5 characters
    });
