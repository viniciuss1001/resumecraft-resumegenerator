import { BicepsFlexed, BriefcaseBusiness, FileBadge2, Globe, GraduationCap, Languages, Share2 } from 'lucide-react';
import React, { Fragment } from 'react'
import MultipleDragListComponent, { MultipleDragItemData } from '../multiple-drag-list/multiple-drag-list';
import { Separator } from '@/components/ui/separator';

const MultiplesSectionsComponent = () => {
    const sectionsKeys: MultipleDragItemData[] = [
        {
          formKey: "socialMedias",
          title: "Redes Sociais",
          icon: Share2,
          titleKey: "name",
          descriptionKey: "username",
        },
        {
          formKey: "experiences",
          title: "Experiências",
          icon: BriefcaseBusiness,
          titleKey: "company",
          descriptionKey: "position",
        },
        {
          formKey: "educations",
          title: "Educação",
          icon: GraduationCap,
          titleKey: "institution",
          descriptionKey: "degree",
        },
        {
          formKey: "skills",
          title: "Habilidades",
          icon: BicepsFlexed,
          titleKey: "name",
          descriptionKey: "description",
        },
        {
          formKey: "languages",
          title: "Idiomas",
          icon: Languages,
          titleKey: "name",
          descriptionKey: "description",
        },
        {
          formKey: "certifications",
          title: "Certificações",
          icon: FileBadge2,
          titleKey: "name",
          descriptionKey: "institution",
        },
        {
          formKey: "projects",
          title: "Projetos",
          icon: Globe,
          titleKey: "name",
          descriptionKey: "description",
        },
      ];
  return (
    <div>
      {sectionsKeys.map((section, index) => (
        <Fragment key={index}>
          <Separator className='my-5'/>
          <MultipleDragListComponent 
          data={section}
          onAdd={() => {}}
          onEdit={(index) => {}}
          />
        </Fragment>
        ))}
    </div>
  )
}

export default MultiplesSectionsComponent