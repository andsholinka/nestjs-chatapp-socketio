const findHoroscope = (horoscopes: any[], birthDate: string) => {
    return horoscopes.find(horoscope => {
        const [year, month, day] = birthDate.split('-').map(Number);
        const inputDate = new Date(year, month - 1, day);
        const [startMonth, startDay] = horoscope.startDate.split('-').map(Number);
        const [endMonth, endDay] = horoscope.endDate.split('-').map(Number);
        const startDate = new Date(year, startMonth - 1, startDay);
        const endDate = new Date(year, endMonth - 1, endDay);

        if ((inputDate >= startDate && inputDate <= endDate) || (inputDate >= startDate && endDate < startDate)) {
            return horoscope;
        }
        return undefined;
    });
}

const findZodiac = (zodiacs: any[], birthDate: string) => {
    return zodiacs.find(zodiac => {
        const [year, month, day] = birthDate.split('-').map(Number);

        if (zodiac.years.includes(year)) {
            return zodiac;
        }
        return undefined;
    });
}

export default {
    findHoroscope,
    findZodiac
}