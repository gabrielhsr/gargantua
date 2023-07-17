import { Period } from "src/app/domain/period/period.dto";

export class DateHelper {
	public static FromPeriod(period: Period) {
		const today = new Date();

		today.setMonth(period.month - 1);
		today.setFullYear(period.year);

		return today
	}

	public static PeriodNow(): Period {
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();

		return { month, year };
	}
}
