import { useForm } from "react-hook-form";
import type {
  FieldValues,
  DefaultValues,
  Path,
  FieldError,
} from "react-hook-form";
import Button from "@/components/Button";
import { InputField } from "@/components/InputField";

type BaseField<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  validation?: object;
};

type InputFieldConfig<T extends FieldValues> = BaseField<T> & {
  type?: string; // text, email, password, etc.
};

type SelectMultipleFieldConfig<T extends FieldValues> = BaseField<T> & {
  type: "select-multiple";
  options: { label: string; value: string }[];
};

type CheckboxGroupFieldConfig<T extends FieldValues> = BaseField<T> & {
  type: "checkbox-group";
  options: { label: string; value: string }[];
};

export type FieldConfig<T extends FieldValues> =
  | InputFieldConfig<T>
  | SelectMultipleFieldConfig<T>
  | CheckboxGroupFieldConfig<T>;

function isCheckboxGroupField<T extends FieldValues>(
  field: FieldConfig<T>
): field is CheckboxGroupFieldConfig<T> {
  return field.type === "checkbox-group";
}

function isSelectMultipleField<T extends FieldValues>(
  field: FieldConfig<T>
): field is SelectMultipleFieldConfig<T> {
  return field.type === "select-multiple";
}

type Props<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  submitLabel?: string;
};

export const DynamicForm = <T extends FieldValues>({
  fields,
  defaultValues,
  onSubmit,
  submitLabel = "Guardar",
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => {
        if (isCheckboxGroupField(field)) {
          return (
            <div key={field.id} className="space-y-1">
              <label className="block font-medium">{field.label}</label>
              <div className="flex flex-wrap gap-4">
                {field.options.map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={opt.value}
                      {...register(field.id, field.validation)}
                      className="form-checkbox"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors[field.id] && (
                <p className="text-red-500 text-sm">
                  {(errors[field.id] as FieldError)?.message as string}
                </p>
              )}
            </div>
          );
        }

        if (isSelectMultipleField(field)) {
          return (
            <div key={field.id} className="space-y-1">
              <label htmlFor={field.id} className="block font-medium">
                {field.label}
              </label>
              <select
                {...register(field.id, field.validation)}
                id={field.id}
                multiple
                className="border rounded p-2 w-full"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors[field.id] && (
                <p className="text-red-500 text-sm">
                  {(errors[field.id] as FieldError)?.message as string}
                </p>
              )}
            </div>
          );
        }

        return (
          <InputField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type || "text"}
            registration={register(field.id, field.validation)}
            error={errors[field.id] as FieldError | undefined}
          />
        );
      })}

      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
    </form>
  );
};
