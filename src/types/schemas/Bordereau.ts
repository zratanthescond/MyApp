import { z } from "zod";
import { TFunction } from "i18next"; // Import type for type-checking

export const createBordereauSchema = (t: TFunction) =>
    z.object({
        MontantTotal: z
            .number({ required_error: t("handlingError:total_amount_required") })
            .min(1000, { message: t("handlingError:total_amount") }),

        DateBordereau: z
            .instanceof(Date, { message: t("handlingError:date_required") })
            .refine(
                (date) =>
                    new Date(date).toLocaleDateString("en-US") <=
                    new Date(Date.now()).toLocaleDateString("en-US"),
                { message: t("handlingError:date_after_today") }
            ),

        NombreDocuments: z
            .number({ required_error: t("handlingError:number_doc_required") })
            .min(1, { message: t("handlingError:number_doc") }),

        AnneeBordereau: z
            .number({ required_error: t("handlingError:year_required") })
            .min(new Date().getFullYear(), { message: t("handlingError:year") }),
    });
