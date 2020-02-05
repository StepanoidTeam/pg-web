export default class CookieService {
  static msDay = 24 * 60 * 60 * 1000;

  static set(key, value, expireDays = 1) {
    const expirationDate = new Date(
      Date.now() + expireDays * CookieService.msDay
    );

    document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
  }

  static get(key) {
    const cookies = document.cookie.split(";").map(val => val.split("="));

    const [, value] = cookies.find(([ckey, value]) => ckey === key) || [, null];

    return value;
  }

  static delete(key) {
    const pastDate = new Date(0);
    document.cookie = `${key}=;expires=${pastDate.toUTCString()};path=/`;
  }

  static clear() {
    const cookies = document.cookie.split(";").map(val => val.split("="));

    cookies.forEach(([key]) => CookieService.delete(key));
  }
}
