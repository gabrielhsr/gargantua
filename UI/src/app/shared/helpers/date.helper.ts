import { Period } from "src/app/entities/period/period.dto";

export class DateHelper {
	public static FromPeriod(period: Period) {
		const today = new Date();

		today.setMonth(period.month - 1);
		today.setFullYear(period.year);

		return today
	}
}
