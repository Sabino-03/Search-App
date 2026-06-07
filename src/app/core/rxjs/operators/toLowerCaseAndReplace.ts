import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export function toLowerCase_Replace() : MonoTypeOperatorFunction<string> {

  return pipe(
    map((input) => input.toLowerCase()),
    map((input) => input.replace('%', ''))
  );
  
}
