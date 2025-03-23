import { Columns3 } from "lucide-react"
import SectionTitleComponent from "../../infos-sidebar/section-title"
import { useFieldArray, useFormContext } from "react-hook-form"
import { ResumeData } from "@/@types/types"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import LayoutDragListComponent from "./layout-drag-list"

const LayoutSectionComponent = () => {

	const { control } = useFormContext<ResumeData>()

	const {
		fields: mainField,
		move: moveMainField,
		insert: insertMainField,
		remove: removeMainField
	} = useFieldArray({
		control,
		name: "structure.layout.mainSections"
	})

	const {
		fields: sidebarFields,
		move: moveSidebarField,
		insert: insertSidebarFields,
		remove: removeSidebarField
	} = useFieldArray({
		control,
		name: "structure.layout.sidebarSections"
	}
	)

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination) return

		if (source.droppableId !== destination.droppableId) {
			switch (destination.droppableId) {
				case "mainField":
					insertMainField(destination.index, sidebarFields[source.index])
					removeSidebarField(source.index)
					break
				case "sidebarFields":
					insertSidebarFields(destination.index, mainField[source.index])
					removeMainField(source.index)
					break
			}
			return
		}

		if (source.droppableId === "mainField") {
			moveMainField(source.index, destination.index)
		} else {
			moveSidebarField(source.index, destination.index)
		}
	}


	return (
		<div>
			<SectionTitleComponent title="Estrutura" icon={Columns3} />

			<DragDropContext onDragEnd={onDragEnd}>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<Droppable droppableId="mainField">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								<LayoutDragListComponent title="Principal"
									fields={mainField}
								/>
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<Droppable droppableId="sidebarFields">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								<LayoutDragListComponent title="Barra Lateral"
									fields={sidebarFields}
								/>
								{provided.placeholder}
							</div>
						)}
					</Droppable>

				</div>
			</DragDropContext>
		</div>
	)
}

export default LayoutSectionComponent