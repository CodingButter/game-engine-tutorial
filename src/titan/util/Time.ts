export default class Time{
    public static timeStarted: number = window.performance.now();
    public static getTime(): number{
        return (window.performance.now() - Time.timeStarted) * 0.001;
    }
}