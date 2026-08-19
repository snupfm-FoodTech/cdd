import FloatInput from '@/components/float-input';
import { Icons } from '@/components/icons';
import Overlay from '@/components/modal/overlay';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useCreateMaterial,
  useGetMaterialCategories,
  useGetMaterialRepresentatives,
  useGetMaterialTypes
} from '@/hooks/diet.hook';
import { MaterialNutrient } from '@/types/food.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AddedNutrientList from './added-nutrient-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// ---------- Validation Schemas ----------

const nutrientSchema = z.object({
  code: z.string(),
  name: z.string(),
  unitCode: z.string(),
  unitName: z.string(),
  amount: z.number().min(0.001, {
    message: '금액 값은 0이 될 수 없습니다.'
  })
});

/**
 * Three-level cascading category:
 * - materialTypeCode (데이터구분명)
 * - materialCategoryId (식품대분류명)
 * - representativeId (대표식품명)
 * All are required.
 */
const createMaterialSchema = z.object({
  materialTypeCode: z.string().min(1, '이 필드는 필수입니다'),
  materialCategoryId: z
    .number({ invalid_type_error: '이 필드는 필수입니다' })
    .int()
    .positive('이 필드는 필수입니다'),
  representativeId: z
    .number({ invalid_type_error: '이 필드는 필수입니다' })
    .int()
    .positive('이 필드는 필수입니다'),
  foodName: z.string().min(1, '이 필드는 필수입니다'),
  weight: z.number().min(0.01, '무게 값은 0일 수 없습니다'),
  nutrients: z.array(nutrientSchema)
});

export type CreateMaterialFormValues = z.infer<typeof createMaterialSchema>;

export const REQUIRED_NUTRIENTS: MaterialNutrient[] = [
  {
    code: 'ENG',
    name: '칼로리',
    unitCode: 'KCAL',
    unitName: 'kcal',
    amount: 1
  }
];

const CreateMaterialModal = () => {
  const [open, setOpen] = useState(false);

  // ---------- Data sources for cascade ----------
  const { data: materialTypes = [] } = useGetMaterialTypes();

  // NOTE: we read the current type/category from form via watch()
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      materialTypeCode: '',
      materialCategoryId: 0,
      representativeId: 0,
      foodName: '',
      weight: 0,
      nutrients: [...REQUIRED_NUTRIENTS]
    }
  });

  const typeCode = form.watch('materialTypeCode');
  const categoryId = form.watch('materialCategoryId');

  const { data: materialCategories = [] } = useGetMaterialCategories(
    typeCode || ''
  );

  const {
    data: materialRepresentatives = [],
    isPending: representativeLoading
  } = useGetMaterialRepresentatives(categoryId || 0);

  const createMaterialMutation = useCreateMaterial();

  // ---------- Defaults & cascade resets ----------

  useEffect(() => {
    if (open) {
      form.reset({
        materialTypeCode: '',
        materialCategoryId: 0,
        representativeId: 0,
        foodName: '',
        weight: 0,
        nutrients: [...REQUIRED_NUTRIENTS]
      });
    }
  }, [open, form]);

  /**
   * When types are loaded the first time:
   * set default to the first item (or the well-known code 'R' if present).
   */
  useEffect(() => {
    if (!materialTypes.length) return;
    const preferred = materialTypes.find((t: any) => t.code === 'R');
    const first = preferred ?? materialTypes[0];
    if (first && form.getValues('materialTypeCode') === '') {
      form.setValue('materialTypeCode', first.code, { shouldDirty: true });
    }
  }, [materialTypes]); // eslint-disable-line

  /**
   * When type changes -> reset category & representative and pick the first category.
   */
  useEffect(() => {
    // Clear children on parent change
    form.setValue('materialCategoryId', 0, { shouldDirty: true });
    form.setValue('representativeId', 0, { shouldDirty: true });

    if (materialCategories.length > 0) {
      form.setValue('materialCategoryId', materialCategories[0].id, {
        shouldDirty: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeCode, materialCategories.length]);

  /**
   * When category changes -> reset representative and pick the first representative.
   */
  useEffect(() => {
    form.setValue('representativeId', 0, { shouldDirty: true });
    if (materialRepresentatives.length > 0) {
      form.setValue('representativeId', materialRepresentatives[0].id, {
        shouldDirty: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, materialRepresentatives.length]);

  const onSubmit = (data: CreateMaterialFormValues) => {
    createMaterialMutation
      .mutateAsync({
        // Send the selected category fields together with the material payload
        representativeId: data.representativeId,
        name: data.foodName,
        weight: data.weight,
        nutrients: data.nutrients
      })
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <Overlay isVisible={open} />
      <DialogTrigger asChild>
        <Button variant="link" type="button" size="sm">
          내 식품 등록하기
          <Icons.chevronRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[90%] md:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold md:text-lg">
            내 식품 등록하기
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="h-[60vh] overflow-y-auto px-2 md:h-auto md:overflow-visible md:px-0">
              {/* ---------- Category Row (3 selects) ---------- */}
              <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                {/* 1-1 데이터구분명 */}
                <FormField
                  control={form.control}
                  name="materialTypeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>데이터구분명</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(v) => field.onChange(v)}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {materialTypes.map((t: any) => (
                              <SelectItem key={t.code} value={t.code}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 1-2 식품대분류명 */}
                <FormField
                  control={form.control}
                  name="materialCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>식품대분류명</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(v) => field.onChange(Number(v))}
                          disabled={!typeCode || !materialCategories.length}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {materialCategories.map((c: any) => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 1-3 대표식품명 */}
                <FormField
                  control={form.control}
                  name="representativeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>대표식품명</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? String(field.value) : undefined}
                          onValueChange={(v) => field.onChange(Number(v))}
                          disabled={
                            !typeCode ||
                            !form.getValues('materialCategoryId') ||
                            representativeLoading
                          }
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {materialRepresentatives.map((r: any) => (
                              <SelectItem key={r.id} value={String(r.id)}>
                                {r.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="foodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>식품명</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={50} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>총 제공량</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <FloatInput
                            className="w-32"
                            value={field.value}
                            onChange={field.onChange}
                            maxLength={4}
                            precision={2}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">
                            g
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-2">
                <FormLabel>영양성분</FormLabel>
                <AddedNutrientList />
              </div>
            </div>
            <div className="flex justify-center px-2 md:px-0">
              <Button
                loading={createMaterialMutation.isPending}
                type="submit"
                size="sm"
                className="mx-auto mt-4 w-full rounded-2xl md:w-48"
              >
                등록하기
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMaterialModal;
