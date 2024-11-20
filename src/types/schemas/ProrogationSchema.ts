import { useTranslation } from "react-i18next";
import { z } from "zod";

export const litigeSchema = () => {
    const { t } = useTranslation(["handlingError"]);


    return z.object({

        DateApresEcheance: z
            .instanceof(Date, { message: t("handlingError:date_required") })
            .refine(
                (date) =>
                    new Date(date).toLocaleDateString("en-US") <=
                    new Date().toLocaleDateString("en-US"),
                { message: t("handlingError:date_after_today") }
            ),

        motif: z.string({ required_error: t("handlingError:motif_required") }),

    });
};