
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

const FinancementSchema = () => {
    const { t } = useTranslation(["handlingError"]);


    return z.object({
        MontantFinancement: z.number({ required_error: t('handlingError:financing_amount_required') })
            .min(1, { message: t("handlingError:financing_amount") }),

        DateDeFinancement: z
            .instanceof(Date, { message: t("handlingError:date_required") })
            .refine(
                (date) =>
                    new Date(date).toLocaleDateString("en-US") <=
                    new Date(Date.now()).toLocaleDateString("en-US"),
                { message: t("handlingError:date_after_today") }
            ),

    });

};
export default FinancementSchema;