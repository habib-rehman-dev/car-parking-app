import { useQuery } from '@tanstack/react-query'
import { getUserById, getUsers } from '../../api/usersApi'
import { userKeys } from '../userKeys'

// Tier 1: basic useQuery
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),   // ['users', 'list']
    queryFn: getUsers,
  })
}

// Tier 2: dependent query — only fetch when we have an ID
export const useUser = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),  // ['users', 'detail', '123']
    queryFn: () => getUserById(id),
    enabled: !!id,   // ← Tier 2: don't run query if id is null/undefined
  })
}