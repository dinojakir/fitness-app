export class MuscleDto {
  id: string | undefined;
  name: string | undefined;
  submuscles: MuscleDto[] = [];
}
