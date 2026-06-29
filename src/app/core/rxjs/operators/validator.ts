import { filter, map, MonoTypeOperatorFunction, pipe, tap } from "rxjs";

export function validator() : MonoTypeOperatorFunction<string> {

    return pipe(
        map((value : string) => {
            switch (value) {
                case 'users' : { return { Value : value, Check : true } }
                case 'posts' : { return { Value : value, Check : true } }
                default : { return { Value : value, Check : false } }
            }
        }),
        filter((parameters : { Value : string, Check : boolean }) => parameters.Check),
        map((parameters : { Value : string, Check : boolean }) => parameters.Value)
    )

}
