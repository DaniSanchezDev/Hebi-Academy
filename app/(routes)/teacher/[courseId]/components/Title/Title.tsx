import { TitleProps } from "./Title.types";

export function Title(props : TitleProps) {

    const {title, icon: Icon} = props
  return (
    <div className="flex items-center mb-6 gap-2">
        <div className=" rounded-full bg-violet-300 p-2 ">
            <Icon className="h-4 w-4 text-violet-600" />
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  )
}
