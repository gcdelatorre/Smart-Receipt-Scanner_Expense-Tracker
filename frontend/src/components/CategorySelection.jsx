import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
} from "./ui/select"

export default function CategorySelection({ categories = [], onChange, name, value }) {

    const categoryElements = categories.map(category => {
        return (
            <SelectItem key={category} value={category}>
                {category}
            </SelectItem>
        )
    })

    return (
        <Select
            value={value}
            onValueChange={(value) =>
                onChange({ target: { name, value } })
            }
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categoryElements}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
