'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TEMPORARY_NUTRIENT_TEMPLATE } from '@/constants';
import { useNutrientStandardTemplates } from '@/hooks/diet.hook';
import { NutrientStandardTemplate } from '@/types/nutrient.type';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import NutrientSkeleton from './nutrient-skeleton';
import NutrientStandardItem from './nutrient-standard-item';
import NutrientStandardModal from './nutrient-standard-modal';
import { SelectNutrientStandard } from '@/components/ui/select-nutrient-standard';

interface NutrientStandardProps {
  dietId?: number;
  handleCustomTemplate?: (template: NutrientStandardTemplate) => void;
  templateUSR?: NutrientStandardTemplate;
}

const NutrientStandard = ({
  dietId,
  handleCustomTemplate,
  templateUSR
}: NutrientStandardProps) => {
  const { data = [], isPending } = useNutrientStandardTemplates(dietId);
  const { setValue, watch, control, getValues } = useFormContext();
  const [templates, setTemplates] = useState<NutrientStandardTemplate[]>([]);

  const selectedTemplateCode = watch('nutrientTemplateCode');

  useEffect(() => {
    if (data && data.length > 0) {
      const nutrientTemplate = getValues('nutrientTemplate');

      let updatedTemplates;

      if (!templateUSR) {
        updatedTemplates = [...data];
      } else {
        updatedTemplates = [...data, templateUSR];
      }
      if (nutrientTemplate?.code) {
        if (
          nutrientTemplate.code !== TEMPORARY_NUTRIENT_TEMPLATE.CODE &&
          !dietId
        ) {
          updatedTemplates = data.map((template) => {
            if (template.code === nutrientTemplate.code) {
              return nutrientTemplate;
            }
            return template;
          });
        }
      }
      setTemplates(updatedTemplates);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, getValues]);

  useEffect(() => {
    if (!templates.length) {
      return;
    }

    // Select first template if no template is selected
    if (!selectedTemplateCode) {
      const FIRST_TEMPLATE = 0;
      setValue('nutrientTemplateCode', templates[FIRST_TEMPLATE].code);
      return;
    }

    // Ensure selected user template
    if (selectedTemplateCode === TEMPORARY_NUTRIENT_TEMPLATE.CODE) {
      setValue('nutrientTemplateCode', selectedTemplateCode);
    }
  }, [templates, selectedTemplateCode, setValue]);

  const handleAddTemplate = (template: NutrientStandardTemplate) => {
    if (template.code === TEMPORARY_NUTRIENT_TEMPLATE.CODE) {
      handleCustomTemplate?.(template);
    }
    setTemplates((prevTemplates) => {
      const index = prevTemplates.findIndex((t) => t.code === template.code);
      if (index !== -1) {
        prevTemplates[index] = template;
        return [...prevTemplates];
      }
      return [...prevTemplates, template];
    });
    setValue('nutrientTemplateCode', template.code);
  };

  const selectedTemplate = useMemo(() => {
    const template = templates.find(
      (template) => template.code === selectedTemplateCode
    );

    if (template) {
      setValue('nutrientTemplate', template);
    }
    return template;
  }, [templates, selectedTemplateCode, setValue]);

  const getTargetText = (template?: NutrientStandardTemplate) => {
    if (!template) return null;

    const name = template.name;
    const typeName = template.typeName;

    if (typeName === '질환관리식') {
      if (name.includes('비만')) {
        return (
          <div className="space-y-2 text-sm leading-relaxed text-gray-400">
            <p>
              <strong>질환관리식 (비만)</strong>
            </p>
            <p>
              출처: 현재 식약처 특수의료용도식품-식품별 기준 및 규격에 명시된
              질환은
              <strong> 당뇨, 신장질환, 암, 고혈압</strong>에 대해서만 명시되어
              있음.
            </p>
            <p>
              비만 관리 식단 기준은 임상영양지침서, 대한비만협회 등에 명시된
              식사요법 및 영양 요구량 등을 정리하여 기준을 새로이 설정하였음.
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-2 text-sm leading-relaxed text-gray-400">
          <p>
            <strong>
              질환관리식 (당뇨환자, 신장질환자(투석), 신장질환자(비투석),
              암환자, 고혈압환자)
            </strong>
          </p>
          <p>
            출처: 식품의약품안전처. 식품공전 제2023-56호. 제5장 식품별 기준 및
            규격,
          </p>
          <p>
            11장 특수의료용도식품, 11-3 식단형 식사관리식품 (2023년 8월 31일
            개정)
          </p>
        </div>
      );
    }

    if (typeName === '건강관리식') {
      return (
        <div className="space-y-2 text-sm leading-relaxed text-gray-400">
          <p>
            <strong>건강관리식 (저당, 저염, 고단백)</strong>
          </p>
          <p>출처: 식품의약품안전처 고시 제2023-64호 식품등의 표시기준</p>
        </div>
      );
    }

    return null;
  };

  if (isPending) {
    return <NutrientSkeleton count={1} />;
  }

  if (!data) return null;
  if (!selectedTemplate) return null;

  return (
    <div>
      <div>
        <FormField
          control={control}
          name="nutrientTemplateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>영양기준</FormLabel>
              <FormControl>
                <SelectNutrientStandard
                  value={field.value}
                  onChange={field.onChange}
                  templates={templates}
                  selectedTemplate={templates.find(
                    (tpl) => tpl.code === field.value
                  )}
                  placeholder="영양소 표준 템플릿 선택"
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </div>
      {selectedTemplate && getTargetText(selectedTemplate) && (
        <div className="mt-4 whitespace-pre-line rounded-md border border-dashed p-3 text-sm text-gray-400">
          {getTargetText(selectedTemplate)}
        </div>
      )}
      {selectedTemplate && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="self-end font-medium text-muted-foreground">
              영양 기준
            </p>
            <NutrientStandardModal
              nutrientTemplate={selectedTemplate}
              onSave={handleAddTemplate}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
            {selectedTemplate.nutrients?.map((nutrient) => (
              <NutrientStandardItem key={nutrient.code} nutrient={nutrient} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutrientStandard;
