export declare class AimGanttChartService {
    constructor();
    getMocked(): {
        name: string;
        start: string;
        end: string;
        level: number;
        progress: number;
        overdue: boolean;
        taskList: {
            start: string;
            end: string;
            name: string;
            id: string;
            progress: number;
            level: number;
            overdue: boolean;
        }[];
    }[];
}
