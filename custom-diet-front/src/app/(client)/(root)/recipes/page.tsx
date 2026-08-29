'use client';

import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BASE_PATH } from '@/constants';
import { useState } from 'react';
import RecipeListSection from './components/recipe-list-section';

type RecipeScope = 'all' | 'mine';

const RecipesPage = () => {
  const [scope, setScope] = useState<RecipeScope>('all');

  return (
    <div>
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-diet-manage.png`}
        title="레시피"
        breadcrumbs={[{ label: '레시피' }]}
      />
      <div className="section-padding my-6 mb-16">
        <Tabs
          value={scope}
          onValueChange={(value) => setScope(value as RecipeScope)}
        >
          <TabsList>
            <TabsTrigger value="all">전체 레시피</TabsTrigger>
            <TabsTrigger value="mine">My Recipe</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <RecipeListSection scope="all" />
          </TabsContent>
          <TabsContent value="mine" className="mt-6">
            <RecipeListSection scope="mine" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecipesPage;
