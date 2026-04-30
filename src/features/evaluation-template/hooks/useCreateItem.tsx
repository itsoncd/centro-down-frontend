// src/hooks/useUsers.js
import { useMutation, useQuery } from '@tanstack/react-query'
import { createItem } from '../api/items.api'


export const useCreateItem = () =>
  useMutation({
    mutationFn: createItem,
  })