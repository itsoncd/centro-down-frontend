// src/hooks/useUsers.js
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../api/items.api'

export const useGetItems = () =>
  useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  })