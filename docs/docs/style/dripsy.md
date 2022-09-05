---
title: Dripsy
---

```tsx twoslash
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'dripsy'

const DripsyItem = styled(DropdownMenu.Item)({
  height: 40,
})

const DropdownMenuItem = DropdownMenu.menuify(DripsyItem, 'Item')

// ...your other components
```
