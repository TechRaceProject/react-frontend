import { BuzzerVariableInterface } from './buzzer_variable.interface';
import { HeadAngleInterface } from './head_angle.interface';
import { PrimaryLedColorInterface } from './primary_led_color.interface';

export interface VehicleStateInterface {
    id: number;
    vehicle_id: number;
    face: number;
    led_animation: number;
    buzzer_alarm: number;
    video_activated: number;
    primary_led_colors: PrimaryLedColorInterface[];
    buzzer_variable: BuzzerVariableInterface;
    head_angle: HeadAngleInterface;
}
