
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

const FinancementSchema = () => {
    const { t } = useTranslation(["handlingError"]);


    return z.object({
        MontantFinancement: z.number({ required_error: t('handlingError:financing_amount_required') })
            .min(1, { message: t("handlingError:financing_amount") }),

        DateDeFinancement: z
            .instanceof(Date, { message: t('handlingError:financing_date_required') })
            .refine((date) => {
                const currentDate = new Date();
                // Comparer les dates en utilisant leurs timestamps (millisecondes depuis le 1er janvier 1970)
                return date.getTime() > currentDate.getTime();
            }, t('handlingError:date_after_today')),
    });

};
export default FinancementSchema;