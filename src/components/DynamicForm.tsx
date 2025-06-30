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

export type FieldConfig<T extends FieldValues> =
  | InputFieldConfig<T>
  | SelectMultipleFieldConfig<T>;

type Props<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  submitLabel?: string;
};

// 🔧 Type Guard para que TypeScript lo entienda
function isSelectMultipleField<T extends FieldValues>(
  field: FieldConfig<T>
): field is SelectMultipleFieldConfig<T> {
  return field.type === "select-multiple";
}

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
