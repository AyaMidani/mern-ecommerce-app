import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
function CommonForm({FormControles, formData , setFormData , onSubmit , buttonText , isBtnDisabled}){
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value=formData[getControlItem.name] || '';
    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={
              event=> setFormData({
                ...formData,
                [getControlItem.name] : event.target.value
              })
            }
          />
        );
        break;

        case "select":
  element = (
    <Select
      value={value}
      onValueChange={(val) =>
        setFormData({
          ...formData,
          [getControlItem.name]: val,
        })
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={getControlItem.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {getControlItem.options?.length
          ? getControlItem.options.map((optionItem) => (
              <SelectItem key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </Select>
  );
  break;

        case 'textarea':
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={
              event=> setFormData({
                ...formData,
                [getControlItem.name] : event.target.value
              })
            }
          />
        );
        break;
      default:
         element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={
              event=> setFormData({
                ...formData,
                [getControlItem.name] : event.target.value
              })
            }
          />
        );
        break;
    }
    return element;
  }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    FormControles.map(controlItem =><div className="grid w-full gap-1.5 " key={controlItem.name}>
                        <label className="mb-1">{controlItem.label}</label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isBtnDisabled} type="submit" className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm;