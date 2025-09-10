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
function CommonForm({FormControles, formData , setFormData , onSubmit , buttonText}){
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

        case 'select':
        element = (
      <Select onValueChange={
              event=> setFormData({
                ...formData,
                [getControlItem.name] : event.target.value
              })
            } value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={getControlItem.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {
            getControlItem.options &&
            getControlItem.options.length > 0 ?
            getControlItem.options.map((optionitem) => 
              <SelectItem key={optionitem.id} value={option.id}>
                {option.label}
              </SelectItem>
            ): null
          }
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
            <Button type="submit" className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm;