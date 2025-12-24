'use client';

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Recipe {
  id: number;
  title: string;
  category: string;
  description: string;
}

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

const defaultRecipes: Recipe[] = [
  { id: 1, title: 'Pancakes', category: 'Breakfast', description: 'Fluffy pancakes with maple syrup.' },
  { id: 2, title: 'Caesar Salad', category: 'Lunch', description: 'Classic Caesar Salad with chicken.' },
  { id: 3, title: 'Spaghetti Carbonara', category: 'Dinner', description: 'Traditional Italian pasta dish.' },
  { id: 4, title: 'Chocolate Cake', category: 'Dessert', description: 'Rich chocolate layered cake.' },
];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(defaultRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [newRecipe, setNewRecipe] = useState({ title: '', category: categories[0], description: '' });
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const handleAddRecipe = () => {
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({ title: '', category: categories[0], description: '' });
    setDialogOpen(false);
  };

  const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          class="input input-bordered w-full mb-4"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn" onClick={() => setDialogOpen(true)}>Add New Recipe</button>
      </div>

      <div>
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-xl font-bold">{category}</h2>
            <ul className="list-disc pl-5">
              {filteredRecipes.filter(recipe => recipe.category === category).map(recipe => (
                <li key={recipe.id}>{recipe.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Transition appear show={isDialogOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setDialogOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Add New Recipe
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full mb-4"
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  />
                  <select
                    className="select select-bordered w-full mb-4"
                    value={newRecipe.category}
                    onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddRecipe}
                  >
                    Add Recipe
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}