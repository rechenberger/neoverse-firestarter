import { Fragment } from 'react'
import { ResourceMap, displayResourceMap } from '../statics/resources'
import { Card } from '../ui/card'

export const ResourceList = ({ resources }: { resources: ResourceMap }) => {
  return (
    <>
      {displayResourceMap(resources).map((resource) => {
        return (
          <Fragment key={resource.type}>
            <Card className="flex flex-row gap-2 px-2 py-1 items-center text-sm">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: resource.definition.color,
                }}
              />
              <div>
                <strong>{resource.amount}</strong>
                <span className="capitalize">&nbsp;{resource.type}</span>
              </div>
            </Card>
          </Fragment>
        )
      })}
    </>
  )
}
